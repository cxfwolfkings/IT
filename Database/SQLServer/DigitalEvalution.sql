use Siemens_DigitalEvalution
go

select * from Dimension

select * from Question

select * from QuestionOption

select * from UserOption

select * from EvaluateUser where Score = (select MAX(Score) from EvaluateUser)

truncate table EvaluateUser
truncate table UserOption

