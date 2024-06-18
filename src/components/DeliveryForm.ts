import { IAdressForm } from "../types";
import { IEvents } from "./base/Events";
import { Form } from "./common/Form";
import { ensureElement, ensureAllElements } from "../utils/utils";

interface IFormActions {
    onClick: (button: string) => void;
}

interface IDeliveryFormView extends IAdressForm {
    paymentButtons: string[];
}

export class DeliveryForm extends Form<IDeliveryFormView> {
    protected _cardButton: HTMLButtonElement;
    protected _cashButton: HTMLButtonElement;
    protected _paymentButtons: HTMLButtonElement[];

    constructor(container: HTMLFormElement, protected events: IEvents, actions?: IFormActions) {
        super(container, events);

        this._cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', container);
        this._cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', container);
        this._paymentButtons = ensureAllElements<HTMLButtonElement>('.button_alt', container);

        this._paymentButtons.forEach(button => {
            button.addEventListener('click', (evt) => {
                if (evt.target === this._cardButton) {
                    this.toggleCard(true);
                    this.toggleCash(false);
                    this.choosePayment('card');
                } else if (evt.target === this._cashButton) {
                    this.toggleCash(true);
                    this.toggleCard(false);
                    this.choosePayment('cash');   
                }
            });
        });
    }

    set address(value: string) {
        this.setText(this.container.elements.namedItem('address') as HTMLInputElement, value);
    }

    clearClassButtons() {
        this._paymentButtons.forEach(button => {
            this.toggleClass(button, "button_alt-active", false);
        });
    }

    choosePayment(value: string) {
        this.events.emit('payment:change', { field: 'payment', value });
    }

    toggleCard(state: boolean = true) {
        this.toggleClass(this._cardButton, 'button_alt-active', state);
    }

    toggleCash(state: boolean = true) {
        this.toggleClass(this._cashButton, 'button_alt-active', state);
    }
}
