import { ITraining } from "../../../data/data"
import { useDispatch } from "react-redux"
import {
    Draggable,
    Droppable,
    DragDropContext,
    DropResult,
} from "react-beautiful-dnd"
import {
    writeCurrentTraining,
    writeCurrentVideoId,
} from "../../../store/generatorTrainingReducer"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import "./exerciseItem.scss"
import { useNavigate } from "react-router-dom"

interface IExerciseItem {
    exercises: ITraining[]
}

function ExerciseItem({ exercises }: IExerciseItem) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleDragEnd = (result: DropResult): void => {
        const {
            destination,
            source: { index },
        } = result

        if (!destination) {
            return
        }
        let cloneExercises = [...exercises]
        const [dragElement] = cloneExercises.splice(index, 1)
        cloneExercises.splice(destination.index, 0, dragElement)

        dispatch(writeCurrentTraining(cloneExercises))
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                    <ul
                        className="custom_training_list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {provided.placeholder}
                        {exercises.map((element, index) => (
                            <Draggable
                                draggableId={element.id.toString()}
                                index={index}
                                key={element.id}
                            >
                                {(provided) => (
                                    <li
                                        className="exercise_item_container_exercise"
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                    >
                                        <section className="exercise_item_block">
                                            <article className="exercise_item_block_left_part">
                                                <img
                                                    src={element.img}
                                                    className="exercise_item_block_img"
                                                    alt={element.title}
                                                />
                                                <div className="exercise_item_block_left_part_info">
                                                    <span>{element.title}</span>
                                                    <div className="exercise_item_block_chips">
                                                        <span>
                                                            {element.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </article>
                                            <article className="exercise_item_block_right_part">
                                                <button
                                                    type="button"
                                                    onTouchStart={() => {
                                                        dispatch(
                                                            writeCurrentVideoId(
                                                                element.youtubeLink
                                                                    .replace(
                                                                        "https://www.youtube.com/watch?v=",
                                                                        ""
                                                                    )
                                                                    .replace(
                                                                        "https://www.youtube.com/shorts/",
                                                                        ""
                                                                    )
                                                            )
                                                        )
                                                        navigate("/exercise")
                                                    }}
                                                >
                                                    <MdOutlineKeyboardArrowRight />
                                                </button>
                                            </article>
                                        </section>
                                    </li>
                                )}
                            </Draggable>
                        ))}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default ExerciseItem
