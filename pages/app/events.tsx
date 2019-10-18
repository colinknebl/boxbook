import EventList from '../../src/components/ui/EventList';
import { User } from '../../src/components/models/User/User';
import router from 'next/router';

interface IProps {
    user: User;
    isClient: boolean;
}

function Events(props: IProps) {
    // console.log('TCL: Events -> props', props);
    // if (!props.user) {
    //     process.browser && router.push('/app');
    //     return null;
    // }
    return (
        <EventList
            user={props.user}
            organization={(props.user || {}).activeOrganization}
        />
    );
}

function requireAuth(component) {
    return component;
}

export default requireAuth(Events);
