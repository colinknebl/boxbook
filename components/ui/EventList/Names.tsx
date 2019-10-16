import { User } from '../../models/User';

interface IProps {
    attendees: User[];
    user: User;
}

function Names({ attendees, user }: IProps) {
    return (
        <div className='attendees'>
            {attendees.map((attendee, index) => {
                let name = `${attendee.name.first} ${attendee.name.last}`;
                if (attendee.id === user.id) {
                    name = 'Me';
                }
                const seperator = index + 1 === attendees.length ? '' : ', ';
                return (
                    <span key={attendee.id}>
                        {name}
                        {seperator}
                    </span>
                );
            })}
        </div>
    );
}

export default Names;
