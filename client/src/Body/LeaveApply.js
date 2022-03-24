import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const LeaveApply = () => {
    const [leave, setLeave] = useState({
        leaveType: "", details: "", startDate: "", endDate: "", duration: ""
    })
    var token = Cookies.get('jwtoken')
    const applyer = '6239a4a2c6ebeff9f75446c5'
    const [leaveTypes, setLeaveType] = useState([])
    //Fetching all Leave Type data
    const getLeaveType = async () => {
        const res = await fetch(`${process.env.REACT_APP_LOCALHOST}/api/leavetype/all`, {
            method: "GET",
        })

        const data = await res.json()
        if (res.status !== 400) {
            setLeaveType(data)
        }
        else {
            //Alert will be printed future
            console.log(res.message);
        }
    }
    var name
    var value
    const eventHandle = (e) => {
        name = e.target.name
        value = e.target.value
        // console.log(name, ":", value);
        if (name==='leaveType'){
            const result = leaveTypes.filter((val)=>{
                return val.name === value
            })
            console.log(result[0]._id);
            setLeave({...leave,leaveType:result[0]._id})
        }
        else{
            setLeave({ ...leave, [name]: value })
        }
        
    }

    //send all data to database
    const postData = async (e) => {
        e.preventDefault();
        const { leaveType,details,startDate,endDate } = leave
        console.log(leave);
        const res = await fetch(`${process.env.REACT_APP_LOCALHOST}/api/leavereq/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                leaveType,details,startDate,endDate,applyer
            }),
            credentials: 'include'
        })
        const data = await res.json()
        if (res.status !== 400) {
            console.log(data)
            // setMessage(data.message)
        }
        else {
            console.log(data)
            // navigate('/login')
        }

    }
    useEffect(() => {
        getLeaveType()
    }, [])
    return (
        <div className="container">

            <form className="well form-horizontal" action=" " method="post" id="contact_form">
                <fieldset>

                    {/* <!-- Form Name --> */}
                    <legend><center><h2><b>Leave Application</b></h2></center></legend><br />


                    <div className="form-group">
                        <label className="col-md-4 control-label">Leave Type</label>
                        <div className="col-md-4 selectContainer">
                            <div className="input-group">
                                <select className="form-select form-select-lg" name='leaveType' defaultValue={'Leave'} aria-label=".form-select-sm example"
                                    onChange={eventHandle}
                                >
                                    <option value="Leave" disabled="disabled">Leave type</option>
                                    {
                                        leaveTypes.map((val, ind) => {
                                            return <option value={val.name} key={ind}>{val.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label">Duration</label>
                        <div className="col-md-4 selectContainer">
                            <div className="input-group">
                                <select className="form-select form-select-lg" name='duration' defaultValue={"Duration"} aria-label=".form-select-sm example"
                                    onChange={eventHandle}>
                                    <option value="Duration" name="duration" disabled="disabled">Duration</option>
                                    <option value="One Day" name="oneday">One Day</option>
                                    <option value="First Half" name="firsthalf">First Half</option>
                                    <option value="Second Half" name="secondhalf">Second Half</option>
                                    <option value="Range" name="range">Range</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Text input--> */}
                    {
                        leave.duration === "Range" ?
                            // console.log("true")
                            <>
                                <div className="form-group">
                                    <label className="col-md-4 control-label">start date</label>
                                    <div className="col-md-4 inputGroupContainer">
                                        <div className="input-group">
                                            <input name="startDate" value={leave.startDate} className="form-control" type="date" onChange={eventHandle} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-4 control-label">end date</label>
                                    <div className="col-md-4 inputGroupContainer">
                                        <div className="input-group">
                                            <input name="endDate" value={leave.endDate} className="form-control" type="date" onChange={eventHandle} />
                                        </div>
                                    </div>
                                </div>
                            </>

                            :
                            // console.log("false")
                            <div className="form-group">
                                <label className="col-md-4 control-label">Day</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <input name="startDate" value={leave.startDate} className="form-control" type="date" onChange={eventHandle} />
                                    </div>
                                </div>
                            </div>


                    }



                    {/* <!-- Text input--> */}
                    <div className="form-group">
                        <label className="col-md-4 control-label">Details</label>
                        <div className="col-md-4 inputGroupContainer">
                            <div className="input-group">
                                <textarea name="details" value={leave.details} placeholder="Add a Comment" className="form-control" type="text" onChange={eventHandle} />
                            </div>
                        </div>
                    </div>


                    {/* <!-- Button --> */}
                    <div className="form-group">
                        <label className="col-md-4 control-label"></label>
                        <div className="col-md-4"><br />
                            <button type="submit" className="btn btn-warning" onClick={postData}>SUBMIT <span className="glyphicon glyphicon-send"></span></button>
                        </div>
                    </div>

                </fieldset>
            </form>
        </div>

    )
}

export default LeaveApply