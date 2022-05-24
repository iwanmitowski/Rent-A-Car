import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteCar, getAllCars, getCarById, getCarsForUser, getNonUserCars } from "../../../services/cars-service";
import { CarCard } from "../car-card/CarCard";
import './CarsList.css';

export function CarsList(props) {
    const [cars, setCars] = useState([]);
    const params = useParams();

    const areMine = props.areMine;
    const isDetails = props.isDetails;

    useEffect(() => {
        if (isDetails) {
            getCarById(params.id)
                .then(res => {
                    setCars(res.data);
                })
                .catch();
            
            return;
        } else if(params.id && areMine) {
            getCarsForUser(params.id)
                .then(res => {
                    setCars(res.data);
                })
                .catch();

            return;
        } else if (params.id && !areMine) {
            getNonUserCars(params.id)
                .then(res => {
                    setCars(res);
                })
                .catch();
            return;
        } 

        getAllCars()
        .then(res => {
                setCars(res.data);
            })
            .catch();
    }, [params.id, areMine]);

    const deleteCarById = async (id) => {
        await deleteCar(id);
        setCars(prevState => {
            return prevState.filter(car => car.id !== id);
        });
    }

    return (
        <div className="cars-list-wrapper">
            {
                cars.map(car => {
                    return <CarCard 
                        key={car.id}
                        car={car}
                        deleteCar={deleteCarById}
                    />
                })
            }
        </div>
    );
}