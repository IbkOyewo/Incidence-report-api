const { createReport, getAllIncidents, getUserIncident } = require("../services")

const createIncidentReport = async(req, res) => {
    try {
        const report = await createReport(req)

        res.status(201).json({
            status: 'success',
            message: 'Incident report created successfully',
            data: report
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
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
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

const fetchUserIncidents = async(req, res, next) => {
    try {
        const { authorizedUser } = req
        const userIncidentReports = await getUserIncident(authorizedUser)

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