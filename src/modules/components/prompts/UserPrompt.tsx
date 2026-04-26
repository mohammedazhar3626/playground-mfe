import "./Prompts.scss"

const UserPrompt = ({ userPrompt }: any) => {
    return (
        <div className="prompts__card">
            <div className="prompts__card-header">
                <h3 className="prompts__card-title">
                    <span>User Prompt</span>
                    <div className="prompts__divider" />
                </h3>
            </div>
            <div className="prompts__content-box">
                {userPrompt || "No user prompt yet"}
            </div>

        </div>
    )
}

export default UserPrompt