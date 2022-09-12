//Imports
import BubbleBackground from '../../common/BubbleContainer/index';
//Component
function BubbleNav({ setNavIsOpen }) {
    return (
        <BubbleBackground setNavIsOpen={setNavIsOpen}>
            <button>Fermer</button>
        </BubbleBackground>
    );
}

//Exports
export default BubbleNav;
