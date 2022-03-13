import useAxios from '../services/useAxios';
import '../styles/home.scss';
import { GiWeightScale, GiBodyHeight } from 'react-icons/gi';
import { BiFace } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import TrainingItem from '../components/TrainingItem';

const Home = () => {
    let axiosInstance = useAxios();
    const [summary, setSummary] = useState({
        age: 28,
        weight: 85,
        height: 185,
    });

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

            <p className="subtitle">Derniers entrainements</p>

            <div className="training-list">
                <TrainingItem />
                <TrainingItem />
                <TrainingItem />
                <TrainingItem />
                <TrainingItem />
                <TrainingItem />
            </div>
        </div>
    );
};

export default Home;
