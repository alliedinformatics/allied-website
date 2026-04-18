import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { email, form, FormField, required } from "@angular/forms/signals";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { ContactContentService } from "../../content/contact-content.service";
import { SiteContentService } from "../../content/site-content.service";
import { PageHeroComponent } from "../../shared/ui/page-hero/page-hero.component";

@Component({
  selector: "app-contact-page",
  imports: [FormField, PageHeroComponent],
  templateUrl: "./contact-page.component.html",
  styleUrl: "./contact-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {
  private readonly contactContent = inject(ContactContentService);
  private readonly siteContent = inject(SiteContentService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly enquiryRecipient = "info@alliedinformatics.com";

  protected readonly content = toSignal(this.siteContent.loadContent(), {
    initialValue: {
      brand: {
        name: "",
        foundedYear: undefined,
        postalCode: "",
        tagline: "",
        logoUrl: "",
      },
      navigation: [],
    },
  });
  protected readonly contact = toSignal(this.contactContent.loadContact(), {
    initialValue: {
      emails: [],
      phones: [],
      addressLines: [],
      postalCode: "",
      socials: [],
      formCtaLabel: "",
      mapEmbedUrl: "",
    },
  });
  protected readonly pageIntro = toSignal(this.contactContent.loadPageIntro(), {
    initialValue: null,
  });
  protected readonly mapUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      this.contact().mapEmbedUrl ?? "",
    ),
  );

  protected readonly submitted = signal(false);

  protected readonly contactModel = signal({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
    message: "",
  });

  protected readonly contactForm = form(this.contactModel, (path) => {
    required(path.name, { message: "Name is required" });
    required(path.email, { message: "Email is required" });
    email(path.email, { message: "Enter a valid email address" });
    required(path.message, { message: "Message is required" });
  });

  protected submit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);

    if (this.contactForm().invalid()) {
      return;
    }

    const { name, email, phone, inquiry, message } = this.contactModel();
    const subject = inquiry?.trim()
      ? `Contact enquiry: ${inquiry.trim()}`
      : `Contact enquiry from ${name.trim()}`;
    const body = [
      "Hello Allied Informatics Team,",
      "",
      "Please find my enquiry details below:",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "N/A"}`,
      `Inquiry: ${inquiry || "General inquiry"}`,
      "",
      "Message:",
      message,
      "",
      "Regards,",
      name,
    ].join("\n");

    globalThis.location.href =
      `mailto:${encodeURIComponent(this.enquiryRecipient)}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    this.contactModel.set({
      name: "",
      email: "",
      phone: "",
      inquiry: "",
      message: "",
    });
    this.submitted.set(false);
  }
}
