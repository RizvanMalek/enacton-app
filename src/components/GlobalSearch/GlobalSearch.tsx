import React from "react";

interface GlobalSearchProps {
    value: string;
    onChange: (value: string) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = (props) => {
    const {
        value,
        onChange
    } = props;
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search launches..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
    );
};

export default GlobalSearch;
