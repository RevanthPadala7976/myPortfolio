"use server"

import { Resend } from "resend"

export async function sendContactEmail(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Basic validation
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all fields.",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  // Check if API key is available
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log("Contact form submission received:", { name, email, message })
    return {
      success: true,
      message:
        "Thank you for your message! I'll get back to you soon. (Demo mode - email functionality requires API key setup)",
    }
  }

  try {
    const resend = new Resend(apiKey)

    await resend.emails.send({
      // Option 1: Use your own verified domain (recommended for production)
      from: "Portfolio Contact <contact@yourdomain.com>",

      // Option 2: Use Resend's domain (works immediately, but less professional)
      // from: "Portfolio Contact <onboarding@resend.dev>",

      to: ["padala.r@northeastern.edu"], // Your email address
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Message</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">From your portfolio website</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Contact Details</h3>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <p style="margin: 0; color: #475569;"><strong style="color: #1e293b;">Name:</strong> ${name}</p>
                <p style="margin: 0; color: #475569;"><strong style="color: #1e293b;">Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
              </div>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
              <div style="line-height: 1.6; color: #475569; white-space: pre-wrap;">${message}</div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Re: Your message from portfolio" 
                 style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
                Reply to ${name}
              </a>
            </div>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This email was sent from your portfolio contact form.<br>
              <strong>Timestamp:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    })

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Failed to send email:", error)

    // Log the submission even if email fails
    console.log("Contact form submission (email failed):", { name, email, message })

    return {
      success: false,
      message:
        "Sorry, there was an error sending your message. Please try contacting me directly at padala.r@northeastern.edu",
    }
  }
}
