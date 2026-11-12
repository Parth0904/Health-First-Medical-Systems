"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { filterSalesProducts } from "@/lib/sales/catalog";
import { parseIndianWhatsAppNumber } from "@/lib/sales/phone";
import {
  buildWhatsAppClickToChatUrl,
  buildWhatsAppEnquiryMessage,
} from "@/lib/sales/message";
import CustomerDetailsCard from "./CustomerDetailsCard";
import ProductSelectionCard from "./ProductSelectionCard";
import MessagePreviewCard from "./MessagePreviewCard";

function createSnapshotKey(normalizedPhone, customerName, selectedProducts) {
  return JSON.stringify({
    phone: normalizedPhone,
    name: customerName.trim(),
    productIds: selectedProducts.map((item) => item.id),
  });
}

export default function SalesAssistantWorkspace({
  initialProducts = [],
  catalogError = "",
}) {
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [generatedState, setGeneratedState] = useState(null);
  const [wasInvalidated, setWasInvalidated] = useState(false);

  const phoneResult = useMemo(
    () => parseIndianWhatsAppNumber(phoneNumber),
    [phoneNumber],
  );

  const filteredProducts = useMemo(
    () => filterSalesProducts(initialProducts, searchQuery),
    [initialProducts, searchQuery],
  );

  const currentSnapshotKey = useMemo(
    () =>
      createSnapshotKey(
        phoneResult.normalized,
        customerName,
        selectedProducts,
      ),
    [phoneResult.normalized, customerName, selectedProducts],
  );

  const isCatalogAvailable = !catalogError && initialProducts.length > 0;
  const canGenerate =
    phoneResult.valid && selectedProducts.length > 0 && isCatalogAvailable;

  const isMessageReady = Boolean(
    canGenerate &&
      generatedState &&
      generatedState.snapshotKey === currentSnapshotKey,
  );

  const whatsappUrl = useMemo(() => {
    if (!isMessageReady || !generatedState) return "";
    return buildWhatsAppClickToChatUrl(
      generatedState.normalizedPhone,
      generatedState.message,
    );
  }, [isMessageReady, generatedState]);

  function invalidateGeneratedMessage() {
    if (generatedState !== null) {
      setGeneratedState(null);
      setWasInvalidated(true);
    }
  }

  function handlePhoneChange(value) {
    setPhoneNumber(value);
    invalidateGeneratedMessage();
  }

  function handlePhoneBlur() {
    setPhoneTouched(true);
  }

  function handleCustomerNameChange(value) {
    setCustomerName(value);
    invalidateGeneratedMessage();
  }

  function handleToggleProduct(product) {
    setSelectedProducts((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
    invalidateGeneratedMessage();
  }

  function handleRemoveProduct(productId) {
    setSelectedProducts((prev) => prev.filter((item) => item.id !== productId));
    invalidateGeneratedMessage();
  }

  function handleClearSelected() {
    setSelectedProducts([]);
    invalidateGeneratedMessage();
  }

  function handleGenerateMessage() {
    setPhoneTouched(true);
    if (!canGenerate) return;

    const message = buildWhatsAppEnquiryMessage({
      customerName,
      selectedProducts,
    });

    setGeneratedState({
      message,
      normalizedPhone: phoneResult.normalized,
      snapshotKey: currentSnapshotKey,
    });
    setWasInvalidated(false);
  }

  function handleRetryCatalog() {
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-7 space-y-6">
        <CustomerDetailsCard
          phoneNumber={phoneNumber}
          customerName={customerName}
          phoneTouched={phoneTouched}
          onPhoneChange={handlePhoneChange}
          onPhoneBlur={handlePhoneBlur}
          onCustomerNameChange={handleCustomerNameChange}
        />

        <ProductSelectionCard
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          catalogProducts={filteredProducts}
          totalCatalogCount={initialProducts.length}
          selectedProducts={selectedProducts}
          isLoadingCatalog={isRefreshing}
          catalogError={catalogError}
          onRetryCatalog={handleRetryCatalog}
          onToggleProduct={handleToggleProduct}
          onRemoveProduct={handleRemoveProduct}
          onClearSelected={handleClearSelected}
        />
      </div>

      <div className="lg:col-span-5">
        <MessagePreviewCard
          customerName={customerName}
          normalizedPhone={phoneResult.normalized}
          isPhoneValid={phoneResult.valid}
          selectedProductsCount={selectedProducts.length}
          canGenerate={canGenerate}
          generatedMessage={isMessageReady ? generatedState.message : ""}
          isMessageReady={isMessageReady}
          wasInvalidated={wasInvalidated}
          whatsappUrl={whatsappUrl}
          onGenerateMessage={handleGenerateMessage}
        />
      </div>
    </div>
  );
}
