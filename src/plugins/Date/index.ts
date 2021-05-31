import { Plugin } from '@vuex-orm/core/dist/src/plugins/use';
import DateType from './DateType';
import Mutator from '@vuex-orm/core/dist/src/attributes/contracts/Mutator';

const plugin: Plugin = {
    install(components: any) {
        components.Model.date = function (value: any, mutator?: Mutator<Date>): DateType {
            return new DateType(this, value, mutator);
        };
    },
};

export default plugin;
