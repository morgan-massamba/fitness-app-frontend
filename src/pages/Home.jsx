import useAxios from '../services/useAxios';
import '../styles/home.scss';
import { GiWeightScale, GiBodyHeight } from 'react-icons/gi';
import { BiFace } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import TrainingItem from '../components/TrainingItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
    let axiosInstance = useAxios();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trainingLoader, setTrainingLoader] = useState(true);
    const [summary, setSummary] = useState({
        age: '',
        weight: '',
        height: '',
    });

    const redirectToTraining = (id) => {
        navigate('/training/' + id);
    };

    //LOADING TRAINING INFORMATIONS
    useEffect(() => {
        const loadTrainingsData = async () => {
            try {
                setTrainingLoader(true);

                const result = await axiosInstance.get('trainings');

                setTrainings(result?.data);

                setTrainingLoader(false);
            } catch (error) {
                console.log(error);
                setTrainingLoader(false);
                toast.error('Une erreur est survenue', {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        };
        loadTrainingsData();
    }, []);

    //LOADING USER INFORMATIONS
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const result = await axiosInstance.get('user');

                if (result?.data?.length > 0) {
                    //SET USER
                    setUser(result.data[0]);

                    //SET SUMMARY OBJECT
                    const summaryObj = {};
                    summaryObj.age = result.data[0].age;
                    summaryObj.weight = result.data[0].weight;
                    summaryObj.height = result.data[0].height;
                    setSummary(summaryObj);
                } else {
                    setUser(null);
                    setSummary({ age: '', weight: '', height: '' });
                }

                setLoading(false);
            } catch (error) {
                console.log(error);
                setUser([]);
                setSummary({ age: '', weight: '', height: '' });
                setLoading(false);
                toast.error('Une erreur est survenue', {
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        };
        loadData();
    }, []);

    return (
        <div className="home">
            {loading && <p>Loading...</p>}
            {!loading && user == null && <p>Aucun utilisateur trouv??</p>}
            {!loading && user !== null && (
                <>
                    <p className="greetings">
                        Bonjour <span>{user.firstname}</span>
                    </p>
                    <p className="happy">Heureux de te revoir !</p>

                    <div className="summary">
                        <div className="summary-item">
                            <div className="summary-item__icon">
                                <BiFace />
                            </div>
                            <div className="summary-item__theme">??ge</div>
                            <div className="summary-item__value">
                                {summary.age}
                            </div>
                            <div className="summary-item__unit">ans</div>
                        </div>
                        <div className="summary-item">
                            <div className="summary-item__icon">
                                <GiWeightScale />
                            </div>
                            <div className="summary-item__theme">Poids</div>
                            <div className="summary-item__value">
                                {summary.weight}
                            </div>
                            <div className="summary-item__unit">kg</div>
                        </div>
                        <div className="summary-item">
                            <div className="summary-item__icon">
                                <GiBodyHeight />
                            </div>
                            <div className="summary-item__theme">Taille</div>
                            <div className="summary-item__value">
                                {summary.height}
                            </div>
                            <div className="summary-item__unit">cm</div>
                        </div>
                    </div>

                    <p className="subtitle">Mes entrainements</p>

                    <div className="training-list">
                        {trainings.map((item) => (
                            <TrainingItem
                                key={item.id}
                                title={item.title}
                                numberOfExercices={item.numberOfExercises}
                                level={item.level}
                                handleClick={() => redirectToTraining(item.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
