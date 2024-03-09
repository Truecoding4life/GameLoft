import React, {useState, useEffect} from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "./queries";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material";
import {Box} from "@mui/system";

function LiveSearch(){
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState([]);
    const {data} = useQuery(QUERY_ALL_PRODUCTS);

    useEffect(() => {
            setOptions(data);
        
    }, [search]);

    return (
        <Box sx={{width: 300}}>
            <Autocomplete
                id="search"
                
                options={options.map((option) => option.title)}
                renderInput={(params) => (
                    <Box component='li' {...props} key={search.id}>
                        {data.name}
                    </Box>
                )}
            />
        </Box>
    )

}