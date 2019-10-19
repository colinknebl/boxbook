import EventList from '../../src/components/ui/EventList';
import { User } from '../../src/components/models/User/User';

interface IProps {
    user: User;
    isClient: boolean;
}

function Events(props: IProps) {
    return (
        <EventList
            user={props.user}
            organization={(props.user || {}).activeOrganization}
        />
    );
}

export default Events;
