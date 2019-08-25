import { Component, OnInit } from '@angular/core'
import { DestroyerComponent } from '../../utils/destroyer.component'
import { TrianglesService } from './triangles.service'
import { takeUntil } from 'rxjs/operators'
import { StorageService } from '../../services/storage.service'

@Component({
  selector: 'app-triangles',
  templateUrl: './triangles.component.html',
  styleUrls: ['./triangles.component.scss']
})

export class TrianglesComponent extends DestroyerComponent implements OnInit {

  rowCount: number

  constructor(private trianglesService: TrianglesService, private storageService: StorageService) {
    super()
  }

  ngOnInit() {
    this.rowCount = this.storageService.getItem('row-count') || 37

    this.trianglesService.toolboxIncreaseSize$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      this.rowCount++
      this.storageService.setItem('row-count', this.rowCount)
    })

    this.trianglesService.toolboxDecreaseSize$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      if (this.rowCount > 1) {
        this.rowCount--
        this.storageService.setItem('row-count', this.rowCount)
      }
    })
  }
}
