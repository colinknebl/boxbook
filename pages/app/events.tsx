import Component from '../../components/ui/EventList';
import { User } from '../../components/models/User/User';
import { Organization } from '../../components/models/Organization/Organization';

interface IProps {
    user: User;
    organization: Organization;
}

function EventList(props: IProps) {
    return <Component user={props.user} organization={props.organization} />;
}

export default EventList;
