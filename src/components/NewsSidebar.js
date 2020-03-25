import FilterListIcon from "@material-ui/icons/FilterList";
import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core/";
import { FormWrapper } from "../styles/newsStyles";

class DialogSelect extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      country: "",
      category: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <>
        <Button color="inherit" onClick={this.handleClickOpen}>
          <FilterListIcon />
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}>
          <DialogTitle style={{ paddingBottom: 0 }}>Filter by: </DialogTitle>
          <DialogContent>
            <FormWrapper>
              <FormControl style={{ margin: 20, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">Country</InputLabel>
                <Select
                  name="country"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.country}
                  onChange={this.handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="us">United States</MenuItem>
                  <MenuItem value="cn">China</MenuItem>
                  <MenuItem value="fr">France</MenuItem>
                  <MenuItem value="ae">United Arab Emirates</MenuItem>
                  <MenuItem value="ar">Argentina</MenuItem>
                  <MenuItem value="at">Austria</MenuItem>
                  <MenuItem value="au">Australia</MenuItem>
                  <MenuItem value="be">Belgium</MenuItem>
                  <MenuItem value="br">Brazil</MenuItem>
                  <MenuItem value="ca">Canada</MenuItem>
                  <MenuItem value="ch">Switzerland</MenuItem>
                  <MenuItem value="co">Colombia</MenuItem>
                  <MenuItem value="cu">Cuba</MenuItem>
                  <MenuItem value="cz">Czechia</MenuItem>
                  <MenuItem value="de">Germany</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{ margin: 20, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">Category</InputLabel>
                <Select
                  name="category"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.category}
                  onChange={this.handleChange}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="technology">Tech</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="health">Health</MenuItem>
                </Select>
              </FormControl>
            </FormWrapper>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
export default DialogSelect;
