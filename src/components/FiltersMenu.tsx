/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Filter } from '../models/Filter';
import { FilterSelect } from './FilterSelect';

const FiltersContainer = styled.div`
    background-color: #7fdbff;
    padding: 16px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 25%;
`;

const ActionButton = styled.button`
    margin: 8px 0;
    padding: 16px;
`;

interface FiltersMenuProps {
    filters: Filter[];
    onApply?: (selectedFilters: Filter[]) => void;
}

const FiltersMenu: React.FC<FiltersMenuProps> = ({ filters, onApply }) => {
    const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);

    const updateSelectedFilters = (filter: Filter) => {
        const filterIndex = selectedFilters.findIndex(item => item.name === filter.name);
        if (filterIndex > -1) {
            const result = [...selectedFilters];
            if (filter.values.length > 0) {
                result[filterIndex] = filter;
            } else {
                result.splice(filterIndex, 1);
            }
            setSelectedFilters(result);
        } else if (filter.values.length > 0) {
            setSelectedFilters([...selectedFilters, filter]);
        }
    };

    return (
        <FiltersContainer>
            <p
                css={css`
                    margin: 0;
                `}
            >
                Filter dimension values
            </p>
            {filters.length > 0 &&
                filters.map(filter => (
                    <FilterSelect key={filter.name} name={filter.name} values={filter.values} onChange={updateSelectedFilters} />
                ))}
            <ActionButton onClick={() => (onApply ? onApply(selectedFilters) : null)}>Apply</ActionButton>
        </FiltersContainer>
    );
};

export { FiltersMenu };
