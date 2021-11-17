const { createReport, getAllIncidents, getUserIncident } = require("../services")

const createIncidentReport = async(req, res, next) => {
    try {
        const report = await createReport(req)

        res.status(201).json({
            status: 'success',
            message: 'Incident report created successfully',
            data: report
        })
    }
    catch (err) {
       return next(err)
    }
}

const fetchAllIncidents = async(req, res) => {
    try {
        const incidentReports = await getAllIncidents()

        res.status(200).json({
            status: 'success',
            message: 'Incident reports fetched successfully',
            data: incidentReports
        })
    }
    catch (err) {
        return next(err)
    }
}

const fetchUserIncidents = async(req, res, next) => {
    try {
        const { user: {id} } = req
        const userIncidentReports = await getUserIncident(id)

        res.status(200).json({
            status: 'success',
            message: 'Incident reports fetched successfully',
            data: userIncidentReports
        })
    }
    catch (err) {
        next(error)
    }
}

module.exports = {
    createIncidentReport,
    fetchAllIncidents,
    fetchUserIncidents
}