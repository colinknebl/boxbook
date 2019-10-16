import EventList from '../../components/ui/EventList';
import { User } from '../../components/models/User/User';

interface IProps {
    user: User;
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
