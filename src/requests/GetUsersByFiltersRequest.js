
const getUsersByFiltersRequest = (limit, skip, search) => {
    return fetch(buildUrl(limit, skip, search))
        .then(res => res.json());
}

const buildUrl = (limit, skip, search) => {
    let url = 'https://dummyjson.com/users/filter';

    if(limit && skip) url += `?limit=${limit}&skip=${skip}`;
    else if(limit) url += `?limit=${limit}`;
    else if(skip) url += `?skip=${skip}`;
    
    if(search) {
        if(limit || skip) url += `&`;
        else url += `?`

        url += `key=firstName&value=${search}`
    }

    return url;
}

export default getUsersByFiltersRequest;