import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

@Component({
  selector: "app-placeholder",
  templateUrl: "./placeholder.component.html",
  styleUrl: "./placeholder.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {
  readonly title = input(false);
  readonly titleShort = input(false);
  readonly copyLines = input(0);
  readonly tight = input(false);
  readonly shortLastLine = input(false);
  readonly pillCount = input(0);

  protected readonly lineIndexes = computed(() =>
    Array.from(
      { length: Math.max(this.copyLines(), 0) },
      (_value, index) => index,
    ),
  );

  protected readonly pillIndexes = computed(() =>
    Array.from(
      { length: Math.max(this.pillCount(), 0) },
      (_value, index) => index,
    ),
  );
}
