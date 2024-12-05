import { Component } from "@angular/core";

@Component({
  imports: [MatButtonModule, MatIconModule, MatTreeModule],
  selector: 'app-tree-view',
  templateUrl: 'tree-view.component.html',
  styleUrls: ['tree-view.component.scss'],
  standalone: true,
})
export class TreeViiwComponent {
  raw_data: string[] = [];
  // private _transformer = (node string) = {}
  dataSource: string;
}
