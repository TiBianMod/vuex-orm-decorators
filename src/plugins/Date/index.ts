import { Plugin } from '@vuex-orm/core/lib/plugins/use';
import DateType from './DateType';
import Mutator from '@vuex-orm/core/lib/attributes/contracts/Mutator';

const plugin: Plugin = {
    install(components: any) {
        components.Model.date = function (value: any, mutator?: Mutator<Date>): DateType {
            return new DateType(this, value, mutator);
        };
    },
};

export default plugin;
