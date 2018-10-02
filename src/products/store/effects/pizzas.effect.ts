import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import * as pizzasAction from '../actions/pizzas.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromServices from '../../services';
import { of } from 'rxjs/observable/of';


@Injectable()
export class PrizzasEffects {
    constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {      
    }

    // @Effect({dispatch: false})
    @Effect()
    loadPizzas$ = this.actions$
    .ofType(pizzasAction.LOAD_PIZZAS)
    .pipe(
        switchMap(() => {
            return this.pizzaService.getPizzas().pipe(
                map(pizzas => new pizzasAction.LoadPizzasSuccess(pizzas)),
                catchError(error => of(new pizzasAction.LoadPizzasFail(error)))
            );
        })
    );
}