import Container from '@material-ui/core/Container';
import ReactAudioPlayer from 'react-audio-player';

const AudioStreamer = ({ mp3Url }) => {

    
    return (
        <>
            <Container maxWidth="xl" disableGutters="true">
            <ReactAudioPlayer
            src="https://inflow-mp3s.s3.us-west-1.amazonaws.com/1BallerinaGirl2.mp3"
            autoPlay
            controls
            />
            </Container>
        </>
    );
};

export default AudioStreamer;
