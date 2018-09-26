import TextField from './text-field';
import isValid from 'date-fns/isValid';

export default class TimeField extends TextField {
  _className = 'TimeField';

  _create(props) {
    super._create(props);

    this.set({
      schema: {
        component: 'Form',
        fields: [
          {
            name: 'showSeconds',
            component: 'BooleanField'
          }
        ]
      }
    });
  }

  set(props) {
    // Convert Date to String? We store dates in ISO String format so that they are compatiable
    // across all stores
    if (props.value !== undefined && props.value instanceof Date) {
      props.value = props.value.toISOString();
    }

    super.set(props);
  }

  // For mocking
  _toLocaleString(date) {
    const currentLocale = [];
    let options = {};
    if (!this.get('showSeconds')) {
      options = {
        hour: '2-digit',
        minute: '2-digit'
      };
    }
    return date.toLocaleTimeString(currentLocale, options);
  }

  getDisplayValue() {
    return this.isBlank()
      ? null
      : this._toLocaleString(new Date(this.getValue()));
  }

  validate() {
    super.validate();

    if (!this.isBlank()) {
      const value = this.getValue();
      const date = new Date(value);

      if (!isValid(date)) {
        this.setErr('invalid');
      }
    }
  }
}