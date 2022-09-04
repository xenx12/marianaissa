import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartasproductosComponent } from './cartasproductos.component';

describe('CartasproductosComponent', () => {
  let component: CartasproductosComponent;
  let fixture: ComponentFixture<CartasproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartasproductosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartasproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
