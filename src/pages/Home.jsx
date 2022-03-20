import useAxios from '../services/useAxios';
import '../styles/home.scss';
import { GiWeightScale, GiBodyHeight } from 'react-icons/gi';
import { BiFace } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import TrainingItem from '../components/TrainingItem';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    let axiosInstance = useAxios();
    const navigate = useNavigate();
    const [summary, setSummary] = useState({
        age: 28,
        weight: 85,
        height: 185,
    });

    const trainings = [
        { id: 1, title: 'Seance bras', numberOfExercices: 4, time: '1h15' },
        { id: 2, title: 'Seance pec', numberOfExercices: 5, time: '1h00' },
        { id: 3, title: 'Seance dos', numberOfExercices: 1, time: '45min' },
        { id: 4, title: 'Seance biceps', numberOfExercices: 3, time: '1h' },
        { id: 5, title: 'Seance cardio', numberOfExercices: 8, time: '15min' },
        { id: 6, title: 'Seance fullbody', numberOfExercices: 4, time: '1h15' },
    ];

    const redirectToTraining = (id) => {
        navigate('/training/' + id);
    };

    useEffect(() => {
        console.log('home page');
    });

    return (
        <div className="home">
            <p className="greetings">Bonjour Morgan</p>
            <p className="happy">Heureux de te revoir !</p>

            <div className="summary">
                <div className="summary-item">
                    <div className="summary-item__icon">
                        <BiFace />
                    </div>
                    <div className="summary-item__theme">Âge</div>
                    <div className="summary-item__value">{summary.age}</div>
                    <div className="summary-item__unit">ans</div>
                </div>
                <div className="summary-item">
                    <div className="summary-item__icon">
                        <GiWeightScale />
                    </div>
                    <div className="summary-item__theme">Poids</div>
                    <div className="summary-item__value">{summary.weight}</div>
                    <div className="summary-item__unit">kg</div>
                </div>
                <div className="summary-item">
                    <div className="summary-item__icon">
                        <GiBodyHeight />
                    </div>
                    <div className="summary-item__theme">Taille</div>
                    <div className="summary-item__value">{summary.height}</div>
                    <div className="summary-item__unit">cm</div>
                </div>
            </div>

            <p className="subtitle">Mes entrainements</p>

            <div className="training-list">
                {trainings.map((item) => (
                    <TrainingItem
                        key={item.id}
                        title={item.title}
                        numberOfExercices={item.numberOfExercices}
                        time={item.time}
                        handleClick={() => redirectToTraining(item.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
