export class Form {

    constructor() {
        this.agreeElement = null;
        this.processElement = null
        this.fields = [
            {
                name: 'name',
                id: 'name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/, //регулярка Первая заглавная + любое кол-во букв
                valid: false,
            },
            {
                name: 'lastName',
                id: 'last-name',
                element: null,
                regex: /^[А-Я][а-я]+\s*$/, //регулярка Первая заглавная + любое кол-во букв
                valid: false,
            },
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, //регулярка Первая заглавная + любое кол-во букв, //регулярка Первая заглавная + любое кол-во букв
                valid: false,
            },
        ];
        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this)
            }
        });
        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm();
        }
        this.agreeElement = document.getElementById('agree');
        this.agreeElement.onchange = function () {
            that.validateForm();
        }
    }


    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.parentNode.style.borderColor = 'red'; //красим рамку родителю
            field.valid = false;
        } else {
            element.parentNode.removeAttribute('style'); // удалим покраску родительской рамки
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        const isValid = this.agreeElement.checked && validForm;
        if (isValid) {
            this.processElement.removeAttribute('disabled')
        } else {
            this.processElement.setAttribute('disabled', 'disabled')
        }
        return isValid;
    }

    processForm() {
        if (this.validateForm()) {
            //нужно собрать строку вида 'choice.html?name=Alex&lastName=Platonov&email=mail@mail.ru'
            let paramString = '';
            this.fields.forEach(item => {
                paramString += (!paramString ? '?' : '&') + item.name + '=' + item.element.value;
            })
            location.href = 'choice.html' + paramString;
        }
    }
}