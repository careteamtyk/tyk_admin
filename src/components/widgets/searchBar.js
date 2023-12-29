import { IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = ({
    placeholder, onSearch, size="10px", boxAlign='block', mystyle={}, cstyle={}
})=>{
    return(
        <div style={{alignSelf: 'center', display: boxAlign, ...cstyle}}>
             <Paper
                    sx={{ padding: '0 6px', borderRadius: 22, backgroundColor: '#f4f4f4', display: 'flex', alignItems: 'center', ...mystyle}}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={placeholder}
                        onChange={onSearch}
                        inputProps={{ 'aria-label': placeholder }}
                    />
                    <IconButton type="submit" sx={{ p: size}} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
        </div>
    ) 
}
export default SearchBar