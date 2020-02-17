import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Filter } from '../models/Filter';

interface FilterSelectProps {
    name: string;
    values: string[];
    onChange?: (filter: Filter) => void;
}

type SelectItem = { label: string; value: string };

const FilterSelect: React.FC<FilterSelectProps> = ({ name, values, onChange }) => {
    const [selectOptions, setSelectOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        const options = values.map(value => ({ label: value, value }));
        setSelectOptions(options);
    }, [values]);

    const selectionChange = (change: any) => {
        let newSelection: string[] = [];
        if (change) {
            newSelection = (change as SelectItem[]).map(item => item.value);
        }
        if (onChange) {
            onChange({ name, values: newSelection });
        }
    };

    return (
        <>
            <p>
                <b>{name}</b>
            </p>
            <Select isMulti options={selectOptions} placeholder={'All'} onChange={selectionChange} />
        </>
    );
};

export { FilterSelect };
