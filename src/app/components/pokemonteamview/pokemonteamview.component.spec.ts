import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonteamviewComponent } from './pokemonteamview.component';

describe('PokemonteamviewComponent', () => {
  let component: PokemonteamviewComponent;
  let fixture: ComponentFixture<PokemonteamviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonteamviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonteamviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
