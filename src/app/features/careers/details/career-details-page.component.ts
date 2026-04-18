import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { switchMap } from "rxjs";
import { CareersContentService } from "../../../content/careers-content.service";
import { CareerOpening } from "../../../content/models/careers-content.models";

@Component({
  selector: "app-career-details-page",
  imports: [CommonModule, RouterLink],
  templateUrl: "./career-details-page.component.html",
  styleUrl: "./career-details-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerDetailsPageComponent {
  private readonly careersContentService = inject(CareersContentService);
  private readonly applyEmailRecipient = "info@alliedinformatics.com";
  readonly id = input<string | null>(null);

  protected readonly career = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => this.careersContentService.loadCareerDetails(id)),
    ),
    { initialValue: null },
  );

  protected buildApplyMailto(career: CareerOpening): string {
    const subject = `Job Application: ${career.title}`;
    const body = [
      "Hello Allied Informatics Team,",
      "",
      "I would like to apply for the role below.",
      "",
      `Position: ${career.title}`,
      `Location: ${career.location || "Not specified"}`,
      `Employment Type: ${career.jobType || "Not specified"}`,
      "",
      "Applicant Details:",
      "Name:",
      "Phone:",
      "Email:",
      "",
      "Resume: (attach file)",
      "Cover Letter:",
      "",
      "Regards,",
      "",
    ].join("\n");

    return this.toMailto(this.applyEmailRecipient, subject, body);
  }

  private toMailto(to: string, subject: string, body: string): string {
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
