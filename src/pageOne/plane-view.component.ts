@Component({
  selector: 'app-plane-view',
  templateUrl: 'tree-plane.component.html',
  styleUrls: ['tree-plane.component.scss'],
})
export class PlaneViewComponent {
  rawData: string[] = [];
  dataSource: string;
  private DATA_ENUM = {
    PLANE: 'plane',
    CAR: 'car',
    BIKE: 'bike',
    TRAIN: 'train',
    BOAT: 'boat',
    BICECLE: 'bicycle',
  };

  checkDataSource() {
    if (this.dataSource === this.DATA_ENUM.PLANE) {
      console.log('Plane');
    } else if (this.dataSource === this.DATA_ENUM.CAR) {
      console.log('Car');
    } else if (this.dataSource === this.DATA_ENUM.BIKE) {
      console.log('Bike');
    } else if (this.dataSource === this.DATA_ENUM.TRAIN) {
      console.log('Train');
    } else if (this.dataSource === this.DATA_ENUM.BOAT) {
      console.log('Boat');
    } else if (this.dataSource === this.DATA_ENUM.BICECLE) {
      console.log('bicycle');
    }
  }
}
