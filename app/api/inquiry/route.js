import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    await resend.emails.send({
      from: "Health First <sales@healthfirstmed.in>",
      to: ["sales@healthfirstmed.in"],

      subject: `New Enquiry - ${data.product || "General"}`,

      html: `
<h2>New Website Enquiry</h2>

<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Email:</strong> ${data.email}</p>

<hr />

<p><strong>Product:</strong> ${data.product}</p>
<p><strong>Category:</strong> ${data.category}</p>
<p><strong>Brand:</strong> ${data.brand}</p>

<hr />

<p><strong>Additional Details:</strong></p>
<p>${data.info}</p>
`
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}