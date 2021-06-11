import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import ModalZipCode from "../components/modal/modal.component";
import { MODAL_CONSTANTS, VALID_ZIP_CODES } from "../Constants";

// This function is used to load the script for Google with the API Key
function loadScript(src, position, id) {
    if (!position) {
        return;
    }
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

// This limits the address options to be 3
const filterOptions = createFilterOptions({
    limit: 3,
});

// This gives styles to the address box
const stylesAutocomplete = {
    MozBoxShadow: '-3px 2px 15px -5px rgb(0 0 0 / 40%)',
    WebkitBoxShadow: '-3px 2px 15px -5px rgb(0 0 0 / 40%)',
    boxShadow: '-3px 2px 15px -5px rgb(0 0 0 / 40%)',
    width: '60%',
    marginTop: '20px'
}

// This adds the icon to the options
const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

// This initialize the Autocomplete Service
const autocompleteService = { current: null };

// This validates the zip code of the address 
const validateZipcode = (placeId) => {
    return (new Promise((resolve, reject) => {
        new window.google.maps.places.PlacesService(
            document.createElement("div")
        ).getDetails(
            {
                placeId,
                fields: ["address_components"],
            },
            details => {
                let postcode = null
                details?.address_components?.forEach(entry => {
                    if (entry.types?.[0] === "postal_code") {
                        postcode = entry.long_name
                        resolve(VALID_ZIP_CODES.indexOf(postcode) > -1)
                    } 
                });
                resolve(false);
            }
        );
    }));
}

// === Main function that starts the Autocomplete render 
export default function AutocompleteGoogle() {
    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [modalTitle, setTitle] = React.useState(MODAL_CONSTANTS.INVALID_TITLE);
    const [modalMessage, setMessage] = React.useState(MODAL_CONSTANTS.INVALID_MESSAGE);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);

    // React hooks for the API calculation
    const loaded = React.useRef(false);
    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    // This handles the Closing of the modal
    const handleClose = () => {
        setOpen(false);
    };

    // This handles the data of the modal
    const handleInvalidAddress = () => {
        setTitle(MODAL_CONSTANTS.INVALID_TITLE);
        setMessage(MODAL_CONSTANTS.INVALID_MESSAGE);
    };
    const handleValidAddress = () => {
        setTitle(MODAL_CONSTANTS.VALID_TITLE);
        setMessage(MODAL_CONSTANTS.VALID_MESSAGE);
    };

    // Loading script for Google
    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyD6tLxic9ggVs0iwnlvQ0U65QPr_NDgrzQ&libraries=places',

                document.querySelector('head'),
                'google-maps',
            );
        }
        loaded.current = true;
    }

    // This hook manages the API data 
    React.useEffect(() => {
        let active = true;
        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }
        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        // This controls the address predictions on the API
        fetch({ input: inputValue }, async (results) => {
            if (active) {
                let newOptions = [];
                if (value) {
                    newOptions = [value];
                }
                if (results) {
                    newOptions = [...newOptions, ...results];
                }
                setOptions(newOptions);
                if (results.length < 3) {
                    validateZipcode(results[0].place_id).then((response) => {
                        if (response) {
                            handleValidAddress();
                        } else {
                            handleInvalidAddress();
                        }
                        setOpen(true);
                    });
                }
            }
        });
        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);
    
    // Redering section for autocomplete component for the main Google address
    return (
        <>
            <Autocomplete
                id="google-map-demo"
                style={stylesAutocomplete}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
                filterOptions={filterOptions}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                onChange={(event, newValue) => {
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Add a location" variant="outlined" fullWidth />
                )}

                // Redering section for the Google address predictions
                renderOption={(option) => {
                    const matches = option.structured_formatting.main_text_matched_substrings;
                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match) => [match.offset, match.offset + match.length]),
                    );
                    return (
                        <Grid container alignItems="center">
                            <Grid item>
                                <LocationOnIcon className={classes.icon} />
                            </Grid>
                            <Grid item xs>
                                {parts.map((part, index) => (
                                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                        {part.text}
                                    </span>
                                ))}
                                <Typography variant="body2" color="textSecondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                }}
            />
            <ModalZipCode open={open} handleClose={handleClose} modalTitle={modalTitle} modalMessage={modalMessage} />
        </>
    );
}
