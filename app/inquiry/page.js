// app/inquiry/page.jsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import PageHero from "../components/Pagehero";

// 1. Move form contents into a standalone component that consumes searchParams safely
function InquiryFormContent() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        product: "",
        category: "",
        brand: "",
        info: "",
        location: "", // Added to map missing location assignments cleanly
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        const product = searchParams.get("product");
        const category = searchParams.get("category");
        const brand = searchParams.get("brand");

        if (product) {
            setFormData((prev) => ({
                ...prev,
                product: product || "",
                category: category || "",
                brand: brand || "",
            }));

            setStep(2);
        }
    }, [searchParams]);

    const updateForm = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const variants = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
    };

    const formRef = useRef(null);

    useEffect(() => {
        if (window.location.search) {
            formRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, []);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/inquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to submit enquiry");
            }

            const data = await res.json();

            if (data.success) {
                setStep(6);
            } else {
                alert("Failed to submit enquiry. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert(
                "Something went wrong. Please try again or contact us on WhatsApp."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={formRef} className="relative overflow-hidden rounded-4xl border border-white/40 bg-white/70 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-6 sm:p-8 lg:p-10 min-h-[700px]">

            {/* CARD HEADER */}
            <div className="mb-10">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-3xl font-bold text-gray-900">Inquiry Form</h3>
                        <p className="text-gray-500 mt-2">
                            Step {Math.min(step, 5)} of 5
                        </p>
                    </div>
                    <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-white text-2xl shadow-lg">
                        ✨
                    </div>
                </div>

                {/* PROGRESS BAR Indicators */}
                <div className="flex items-center gap-2 mt-8">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= item
                                ? "bg-linear-to-r from-blue-600 to-cyan-500"
                                : "bg-gray-200"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* ACTIVE STEP DISPLAY WRAPPER */}
            <div className="relative min-h-[450px]">
                <AnimatePresence mode="wait">

                    {/* STEP 1: INITIAL CHOICE */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.35 }}
                            className="absolute inset-0"
                        >
                            <div className="text-center">
                                <div className="w-28 h-28 rounded-[28px] bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center mx-auto text-5xl text-white shadow-2xl mb-8">
                                    📦
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Product Inquiry</h3>
                                <p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-10">
                                    Browse products first or continue directly with a custom inquiry.
                                </p>

                                <div className="space-y-4 max-w-md mx-auto">
                                    <a
                                        href="/products"
                                        className="flex items-center justify-center w-full py-4 px-6 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300"
                                    >
                                        Browse Products
                                    </a>
                                    <button
                                        onClick={nextStep}
                                        className="w-full py-4 px-6 rounded-2xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
                                    >
                                        Continue Inquiry
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: REGION SELECTION */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.35 }}
                            className="absolute inset-0"
                        >
                            <h3 className="text-3xl font-bold text-gray-900 mb-3">Select Region</h3>
                            <p className="text-gray-500 mb-8">This helps route your inquiry correctly.</p>

                            <div className="space-y-5">
                                <button
                                    onClick={() => {
                                        updateForm("location", "India");
                                        nextStep();
                                    }}
                                    className="group w-full rounded-3xl border border-gray-200 bg-white/80 p-6 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">🇮🇳</div>
                                        <div className="text-left">
                                            <h4 className="text-lg font-semibold text-gray-900">India</h4>
                                            <p className="text-sm text-gray-500 mt-1">Domestic inquiries & support</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl text-gray-400 group-hover:text-blue-600 transition-all">→</div>
                                </button>

                                <button
                                    onClick={() => {
                                        updateForm("location", "Overseas");
                                        nextStep();
                                    }}
                                    className="group w-full rounded-3xl border border-gray-200 bg-white/80 p-6 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center text-3xl">🌍</div>
                                        <div className="text-left">
                                            <h4 className="text-lg font-semibold text-gray-900">Overseas</h4>
                                            <p className="text-sm text-gray-500 mt-1">International inquiries & exports</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl text-gray-400 group-hover:text-blue-600 transition-all">→</div>
                                </button>
                            </div>

                            <button onClick={prevStep} className="mt-8 text-sm text-gray-500 hover:text-blue-600">
                                ← Back
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 3: GENERAL WORK/INFO DETAILS */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.35 }}
                            className="absolute inset-0"
                        >
                            <h3 className="text-3xl font-bold text-gray-900 mb-3">Your Information</h3>
                            <p className="text-gray-500 mb-8">Tell us about your requirement.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name*</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => updateForm("name", e.target.value)}
                                        className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Describe your requirements..."
                                        value={formData.info}
                                        onChange={(e) => updateForm("info", e.target.value)}
                                        className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-800 placeholder:text-gray-400 outline-none resize-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-10">
                                <button onClick={prevStep} className="text-sm text-gray-500 hover:text-blue-600">
                                    ← Back
                                </button>
                                <button
                                    onClick={() => {
                                        if (!formData.name.trim()) {
                                            alert("Please enter your name");
                                            return;
                                        }
                                        nextStep();
                                    }}
                                    className="py-4 px-8 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300"
                                >
                                    Continue →
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: CONTACT OVERVIEW */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.35 }}
                            className="absolute inset-0"
                        >
                            <h3 className="text-3xl font-bold text-gray-900 mb-3">Contact Details</h3>
                            <p className="text-gray-500 mb-8">Final step before submission.</p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number*</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="+91 9876543210"
                                        value={formData.phone}
                                        onChange={(e) => updateForm("phone", e.target.value)}
                                        className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => updateForm("email", e.target.value)}
                                        className="w-full rounded-2xl border border-gray-200 bg-white/80 px-5 py-4 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="sticky bottom-0 bg-white/70 backdrop-blur-xl pt-8 mt-10">
                                <div className="flex justify-between items-center mt-10">
                                    <button onClick={prevStep} className="text-sm text-gray-500 hover:text-blue-600">
                                        ← Back
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (!formData.name.trim()) {
                                                alert("Please enter your name");
                                                return;
                                            }
                                            if (!formData.phone.trim()) {
                                                alert("Please enter your phone number");
                                                return;
                                            }
                                            nextStep();
                                        }}
                                        className="py-4 px-8 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300"
                                    >
                                        Continue →
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 5: ACTION SUBMISSION PORTAL */}
                    {step === 5 && (
                        <motion.div
                            key="step5"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.35 }}
                            className="absolute inset-0"
                        >
                            <div className="h-full flex flex-col justify-center">
                                <div className="text-center mb-10">
                                    <div className="w-24 h-24 rounded-3xl bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-6 text-4xl text-white shadow-xl">
                                        🚀
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Submit Inquiry</h3>
                                    <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                                        Choose how you'd like to continue your inquiry.
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {/* EMAIL METHOD */}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="py-5 px-6 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
                                    >
                                        {loading ? "Sending..." : "📧 Email Inquiry"}
                                    </button>

                                    {/* WHATSAPP METHOD */}
                                    <button
                                        onClick={() => {
                                            const message = `Hello,\n\nI would like to enquire about:\n\n${formData.info}\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || "N/A"}\nLocation: ${formData.location}`;
                                            window.open(
                                                `https://wa.me/919920986401?text=${encodeURIComponent(message)}`,
                                                "_blank"
                                            );
                                            setStep(6);
                                        }}
                                        className="py-5 px-6 rounded-2xl bg-[#25D366] text-white font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300"
                                    >
                                        💬 WhatsApp Inquiry
                                    </button>
                                </div>

                                <button onClick={prevStep} className="mt-8 text-sm text-gray-500 hover:text-blue-600 self-center">
                                    ← Back
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 6: SUCCESS */}
                    {step === 6 && (
                        <motion.div
                            key="step6"
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.35 }}
                            className="absolute inset-0"
                        >
                            <div className="h-full flex flex-col justify-center items-center text-center p-6">
                                <div className="w-28 h-28 rounded-4xl bg-green-100 flex items-center justify-center mb-8 text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-12 h-12">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>

                                <h3 className="text-4xl font-bold text-gray-900 tracking-tight">
                                    Enquiry Submitted
                                </h3>

                                <p className="mt-4 max-w-md text-gray-500 leading-relaxed">
                                    Thank you for contacting Health First Medical Systems.
                                    Our team will review your requirements and get back to you shortly.
                                </p>

                                <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
                                    <a
                                        href="/products"
                                        className="py-4 px-8 rounded-2xl border border-gray-200 bg-white text-gray-700 font-medium text-center transition-all hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98]"
                                    >
                                        Browse Products
                                    </a>
                                    <a
                                        href="/"
                                        className="py-4 px-8 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold text-center transition-all hover:opacity-95 shadow-md shadow-blue-500/10 active:scale-[0.98]"
                                    >
                                        Back To Home
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

// 2. Exported main page layout managing the structural tags wrapper and setting the Suspense core fallback boundary.
export default function InquiryPage() {
    return (
        <main className="relative overflow-hidden min-h-screen bg-[#f5f7fb]">

            {/* BACKGROUND DECORATIONS */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/30 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200/30 blur-3xl rounded-full" />
            <PageHero
                badge="Inquiry"
                title="Tell Us Your Requirements"
                description="Share your requirements and our team will help you identify the right medical equipment for your facility."
            />

            {/* NAVBAR */}
            <nav className="relative z-20 w-full border-b border-black/5 backdrop-blur-xl bg-white/60">
                <div className="max-w-7xl mx-auto px-5 lg:px-10 h-20 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">
                            Health First Medical Systems
                        </h1>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <div className="px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium">
                            Response within 24h
                        </div>
                        <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium">
                            Secure Inquiry
                        </div>
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT SECTION */}
            <section className="relative z-10">
                <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 lg:py-20">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">

                        {/* LEFT SIDE: MARKETING & FEATURES */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                                Premium Support System
                            </div>

                            <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                                Let’s Build{" "}
                                <span className="block bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                    Your Requirement
                                </span>
                            </h2>

                            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                                Submit your inquiry through our guided premium system.
                                Faster communication, cleaner workflow, better support.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mt-10">
                                <div className="rounded-3xl border border-black/5 bg-white/70 backdrop-blur-xl p-5 shadow-sm">
                                    <div className="text-3xl mb-3">⚡</div>
                                    <h3 className="font-semibold text-gray-900">Fast Response</h3>
                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                        Most inquiries are reviewed within 24 hours.
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-black/5 bg-white/70 backdrop-blur-xl p-5 shadow-sm">
                                    <div className="text-3xl mb-3">🔒</div>
                                    <h3 className="font-semibold text-gray-900">Secure Inquiry</h3>
                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                        Your information remains protected and private.
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-black/5 bg-white/70 backdrop-blur-xl p-5 shadow-sm">
                                    <div className="text-3xl mb-3">🌍</div>
                                    <h3 className="font-semibold text-gray-900">Global Reach</h3>
                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                        Domestic and international inquiry support.
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-black/5 bg-white/70 backdrop-blur-xl p-5 shadow-sm">
                                    <div className="text-3xl mb-3">💬</div>
                                    <h3 className="font-semibold text-gray-900">Flexible Contact</h3>
                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                        Continue through email or WhatsApp later.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: MULTI-STEP FORM CARD WITH SUSPENSE */}
                        <div>
                            <Suspense fallback={
                                <div className="rounded-4xl border border-white/40 bg-white/70 backdrop-blur-2xl p-10 min-h-[700px] flex items-center justify-center">
                                    <div className="text-gray-400 animate-pulse text-lg">Loading secure inquiry form...</div>
                                </div>
                            }>
                                <InquiryFormContent />
                            </Suspense>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}