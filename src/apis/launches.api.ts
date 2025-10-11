const getLaunchesDataAPI = (params: object) => {
    return {
        url: `/launches`,
        method: 'GET',
        params
    }
}

const getLaunchByIdAPI = (flight_number: string | number) => {
    return {
        url: `/launches/${flight_number}`,
        method: 'GET',
    };
};

export {
    getLaunchesDataAPI,
    getLaunchByIdAPI
}