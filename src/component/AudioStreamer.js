import Container from '@material-ui/core/Container';
import ReactAudioPlayer from 'react-audio-player';

const AudioStreamer = ({ mp3Url }) => {

    return (
        <>
            <Container maxWidth="xl" disableGutters="true">
            <ReactAudioPlayer
            src={`${mp3Url}`}
            autoPlay
            controls
            />
            </Container>
        </>
    );
};

export default AudioStreamer;
