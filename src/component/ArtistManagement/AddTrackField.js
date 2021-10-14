import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const AddTrackField = ({ setMp3Name, setMp3File, uploaded }) => {
    return (
        <Grid container direction="row">
            <Grid item xs={9}>
                <label>Track Name </label>
                <div className="comman-row-input">
                    <input
                        placeholder="track name"
                        type="text"
                        name="twitter url"
                        onChange={(e) => setMp3Name(e.target.value)}
                    />
                </div>
            </Grid>
            <Grid item xs={3}>
                {uploaded ? (
                    <Button
                        variant="disabled"
                        size="large"
                        style={{
                            marginLeft: 20,
                            marginTop: 31,
                            backgroundColor: 'grey'
                        }}
                        component="span"
                    >
                        UPLOAD
                    </Button>
                ) : (
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            style={{ marginLeft: 20, marginTop: 31 }}
                            component="span"
                            type="file"
                            onChange={(e) => setMp3File(e.target.files[0])}
                        >
                            UPLOAD
                            <Input
                                id="contained-button-file"
                                hidden
                                type="file"
                                onChange={(e) => setMp3File(e.target.files[0])}
                            />
                        </Button>
                    </label>
                )}
            </Grid>
        </Grid>
    );
};

export default AddTrackField;
