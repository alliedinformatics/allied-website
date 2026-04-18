import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { LegalContentService } from "../../../content/legal-content.service";

@Component({
  selector: "app-terms-and-conditions-page",
  imports: [],
  templateUrl: "./terms-and-conditions-page.component.html",
  styleUrl: "./terms-and-conditions-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsAndConditionsPageComponent {
  private readonly legalContentService = inject(LegalContentService);

  protected readonly content = toSignal(
    this.legalContentService.loadTermsAndConditions(),
    {
      initialValue: null,
    },
  );
}
