import requests

from config import settings


def send_contact_notification(name: str, email: str, company: str, message: str, service_interest: str):
    """Sends an email to the studio's inbox when a contact form is submitted.

    Uses Resend's HTTPS API instead of raw SMTP, since many hosts (including
    Render's free tier) block outbound SMTP ports (25/465/587). Silently
    does nothing if not configured, so local dev without email setup
    doesn't crash the contact endpoint.
    """
    if not settings.resend_api_key or not settings.contact_notify_email:
        return

    body = f"""New message from the Caelogix contact form:

Name: {name}
Email: {email}
Company: {company or "-"}
Service interested in: {service_interest or "-"}

Message:
{message}
"""

    try:
        response = requests.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {settings.resend_api_key}"},
            json={
                "from": f"Caelogix Contact Form <{settings.contact_from_email}>",
                "to": [settings.contact_notify_email],
                "reply_to": email,
                "subject": f"New contact form submission — {name}",
                "text": body,
            },
            timeout=10,
        )
        if response.status_code >= 400:
            print(f"Failed to send contact notification email: {response.status_code} {response.text}")
    except Exception as e:
        # Don't let an email failure break the contact form submission itself
        print(f"Failed to send contact notification email: {e}")