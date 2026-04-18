import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { LegalContentService } from "../../../content/legal-content.service";

@Component({
  selector: "app-privacy-policy-page",
  imports: [],
  templateUrl: "./privacy-policy-page.component.html",
  styleUrl: "./privacy-policy-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyPageComponent {
  private readonly legalContentService = inject(LegalContentService);

  protected readonly content = toSignal(
    this.legalContentService.loadPrivacyPolicy(),
    {
      initialValue: null,
    },
  );
}
