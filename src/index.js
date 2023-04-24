import Vue from 'vue';

function registerComponents(listComponents) {
    listComponents.forEach(function (component) {
        if (Array.isArray(component)) {
            registerComponents(component)
        } else if (component.extendOptions) {
            Vue.component(component.extendOptions.name, component);
        }
        else if (component.name) {
            Vue.component(component.name, component);
        }
        else {
            console.warn('Не найдены расширенные свойства компонента.')
        }
    })
}

import ExerciseText from "./App"

var components = [
    ExerciseText
]
registerComponents(components);



export default components