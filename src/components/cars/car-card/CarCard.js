import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../services/auth-service";
import { getCarById } from '../../../services/cars-service';

export function CarCard(props) {
    const params = useParams();
    const user = getUser();

    const deleteCar = props.deleteCar;
    let [car, setCar] = useState();

    useEffect(() => {
        if(props.isDetails) {
            console.log(11111111111111);
            getCarById(params.id)
                .then(res => {
                    setCar(res.data);
                });
        } else {
            setCar(props.car);
        }
    }, [params.id, props.car]);
    
    const isCarOwner = car && user && user.id === car.ownerId;

    const navigate = useNavigate();

    const toEdit = () => {
        navigate(`/car/edit/${car.id}`);
    }

    return (
        car &&
        <div className="task-card-wrapper">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={car.imageUrl} />
                <Card.Body>
                    <Card.Title>{car.brand} - {car.model}</Card.Title>
                    <Card.Text>
                        <span className="key">Construction Year: </span>
                        <span className="value">{car.constructionYear}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="key">Type: </span>
                        <span className="value">{car.type}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="key">Fuel Type: </span>
                        <span className="value">{car.fuelType}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="key">Seats: </span>
                        <span className="value">{car.seatsCount}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="key">Available count: </span>
                        <span className="value">{car.count}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="key">Price per day: </span>
                        <span className="value">{car.pricePerDay}</span>
                    </Card.Text>
                    <div className='btn-holder'>
                        {
                            isCarOwner &&
                            <Button variant="primary" onClick={toEdit}>Edit</Button>
                        }
                        {
                            isCarOwner &&
                            <Button variant="danger" onClick={() => deleteCar(car.id)}>Delete</Button>
                        }
                        {
                            !isCarOwner &&
                            <Button variant="warning" >Rent</Button>
                        }
                    </div>
                </Card.Body>
        </Card>
        </div>
    );
}