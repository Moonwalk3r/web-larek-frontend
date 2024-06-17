# Проектная работа "Веб-ларек"
Проект представляет из себя страницу интернет-магазина, в котором представлены товары для веб-разработчиков.
В нем можно посмотреть представленный каталог товаров, добавить в корзину и оформить из нее заказ.
[Ссылка на репозиторий Git](https://github.com/Moonwalk3r/web-larek-frontend.git)

### Об архитектуре
Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычисления между этой передачей. Слушатели также изменяют значения в моделях, обеспечивая динамическое обновление и синхронизацию состояния приложения.

При проектировании использовался шаблон Model-View-Presenter. Взаимодействие компонентов осуществляет брокер событий.
В роли презентера выступает код описанный в основном скрипте приложения.

Стек: HTML, SCSS, TS, Webpack


### Структура данных:
Проект использует следующие типы данных:

IProductItem: Данные о продукте, включая id, описание, изображение, название, категорию и цену.
IOrder, IOrderResult: Данные о заказе и результате его отправки на сервер.
IAdressForm, IContactsForm: Данные из формы доставки и контактов.
FormErrors: Ошибки валидации форм.
Использование компонентов
Проект состоит из компонентов, таких как Page, Modal, Card, Basket, DeliveryForm, ContactForm, Success и других, каждый из которых выполняет определенную функцию в интерфейсе магазина.

### Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание данных.
### тип данных по запросу от сервера

```
type ApiListResponse<Type> = {
    total: number
    items: Type[]
};
```

### тип методов запроса на сервер

```
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```

### тип событий

```
interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

### тип данных товара

```
interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number|null;
}
```

### состояние страницы

```
interface IAppState {
    catalog: IProductItem[];
    basket: string[];
    order: IOrder | null;
}
```

### данные из формы доставки и метода оплаты

```
interface IAdressForm {
    payment: string;
    adress: string;
}
```

### данные из формы контактов

```
interface IContactsForm  {
    email: string;
    phone: string;
}
```

### данные заказа

```
interface IOrder extends IAdressForm, IContactsForm {
    items: string[];
    total: number;
}
```

### данные заказа на отправку серверу

```
interface IOrderResult {
    id: string;
    total: number;
}
```

### данные ошибки ввода форм

```
type FormErrors = Partial<Record<keyof IOrder, string>>;
```

### тип данных для отображения страницы

```
interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}
```

### тип данных клика карточки

```
interface ICardActions {
    onClick: (event: MouseEvent) => void;
}
```

### тип данных для отображения содержимого корзины

```
interface IBasketView {
    items: HTMLElement[];
    total: number;
}
```

### тип данных отображения успешной покупки

```
interface ISuccess {
    total: number;
}
```

### тип данных валидации формы

```
interface IFormState {
    valid: boolean;
    errors: string[];
}
```

### тип данных для контента внутри модальных окон

```
interface IModalData {
    content: HTMLElement;
}
```

### Модель данных
### Класс API
Класс API отвечает за осуществление HTTP-запросов к серверу.

### Конструктор
```
constructor(baseUrl: string, options: RequestInit = {})
```
Принимает базовый URL и опции для запросов.


### Методы
handleResponse: Обрабатывает ответ сервера, возвращая JSON или сообщение об ошибке.
get: Выполняет GET-запрос к серверу.
post: Выполняет POST-запрос к серверу.

### Класс ProductsApi наследуется от Api
ProductsApi расширяет класс API и предоставляет функционал для работы с продуктами в магазине.

### Конструктор
```
constructor(cdn: string, baseUrl: string, options?: RequestInit)
```
Принимает CDN для изображений, базовый URL и опции для запросов.

### Методы
getProductList: Получает список всех продуктов.
getProductItem: Получает информацию о конкретном продукте.
orderProducts: Отправляет заказ на сервер.

### Класс EventEmitter
EventEmitter реализует паттерн "Издатель-подписчик" для взаимодействия компонентов приложения.

### Методы
on: Устанавливает обработчик события.
off: Удаляет обработчик события.
emit: Инициирует событие с передачей данных.
onAll, offAll: Устанавливает и удаляет обработчики для всех событий.
trigger: Создает триггер-коллбэк для события.

### Класс AppState наследуется от Model
(модель состояния страницы)
свойства:
- catalog (массив товаров)
- basket (массив товаров в корзине)
- order (объект данных о заказе)
- formErrors (объект с ошибками форм)

### Методы
- setCatalog (формирует каталог продуктов, инициализирует событие изменения каталога)
- clearBasket (очищает корзину)
- clearOrder (очищает данные заказа)
- addToBasket (добавляет товар в корзину)
- updateBasket (эмитеры на измененения в корзине)
- findInBasket (поиск продукта в корзине)
- removeFromBasket (удаляет товар из корзины)
- validateDelivery (проверяет значения данных доставки)
- validateContact (проверяет значения данных контактов)
- setDeliveryField (формирует данные доставки, валидирует и  инициализирует событие о готовности)
- setContactField (формирует данные контактов доставки, валидирует и  инициализирует событие о готовности)
- setTotal (устанавливает сумму заказа)
- getTotal (считает сумму заказа)
- setItems (устанавливается товары в заказ)
- setPayment (устанавливает метод оплаты в заказ)

### Класс Card наследуется от Component
(используется для отображения карточки товара)
```
constructor(blockName: string, container: HTMLElement, actions?: ICardActions) /*Инициализирует элементы карточки и устанавливает обработчики событий для кнопки*/
```
### Методы
- set/get id (управляет идентификатором карточки)
- set/get title (управляет названием товара)
- set image (устанавливает изображение товара)
- set description (устанавливает описание товара)
- set/get category (установить класс на категорию товара /получить наименование категории)
- set price (управляет ценой товара)
- set buttonTitle (управляет текстом на кнопке карточки)
- disablePriceButton (проверяет цену и делает кнопку покупки неактивной если цена не указана)

### Класс Basket наследуется от Component
(используется для отображение корзины, управляет товарам, общей стоимостью)
```
constructor(container: HTMLElement, events: EventEmitter) /*инициализирует элементы управления корзины и подписывается на события*/
```
### Методы
- set items (устанавливает товары в корзине)
- set/get total (устанавливает и отображает общую стоимость товаров в корзине)
- toggleButton (управляет кнопкой оформления заказа в корзине)

### Класс itemProductBasket наследуется от Component
(используется для экземпляра товара в корзине)
```
constructor(protected blockName: string, container: HTMLElement, actions?: IitemProductBasketAction)
```
### Методы
- set index (устанавливает порядковый номер товара в корзине)
- set title (устанавливает название товара в корзине)
- set price (устанавливает стоимость товара в корзине)

### Общий Класс Form наследуется от Component
(используется для отображения и управления формами)
```
constructor(container: HTMLFormElement, events: IEvents)
```
### Методы
- onInputChange (обработчик полей форм)
- set valid (управляет кнопкой отправки формы в зависимости от валидации)
- set errors (устанавливает ошибки валидации формы)
- render (рендерит форму)

### Класс DeliveryForm наследуется от Form
(используется для отображения и управления формой с выбором способа оплаты и адреса доставки)
```
constructor(container: HTMLFormElement, events: IEvents, actions?: IFormActions) 
```
### Методы
- set address (устанавливает адрес доставки)
- clearClassButtons (сбрасывает активный класс кнопок оплаты)
- choosePayment (управляет методом оплаты товара)

### Класс ContactForm наследуется от Form
(используется для отображения и управления формой ввода email и телефона)
```
constructor(container: HTMLFormElement, events: IEvents) 
```
### Методы
- set email (устанавливает адрес электронной почты)
- set phone (устанавливает номер телефона)

### Класс Component
(используется при создании элементов в слое отображения)
свойство - корневой DOM-элемент
```
constructor(container: HTMLElement)
```
### Методы
- toggleClass (переключить класс)
- setText (установить текстовое содержимое)
- setDisabled (сменить статус блокировки)
- setHidden (скрыть)
- setVisible (показать)
- setImage (установить изображение с алтернативным текстом)
- render (вернуть корневой DOM-элемент)

### Класс Success наследуется от Component
(используется для отображения сообщения об успешном оформлении заказа)
```
constructor(container: HTMLElement, actions?: ISuccessActions)
```
### Методы
- set total (устанавливает стоимость покупки)

## Описание событий.
- modal:open (открытие модального окна)
- modal:close (закрытие модального окна)
- items:changed (изменение товаров в каталоге)
- card:select (выбрана карточка товара)
- basket:open (открытие корзины)
- basket:changed (изменение корзины)
- counter:changed (изменение счетчика товаров корзины)
- addressForm:open (открыть форму способа оплаты и адреса доставки)
- order:submit (отпрыть форму контактов)
- contacts:submit (отправка формы всего заказа)
- formErrorsDelivery:change (изменение валидации доставки)
- formErrorsContacts:change (изменение валидации контактов)
