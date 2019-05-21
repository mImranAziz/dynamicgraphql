# Dynamic Views
Please refer to Dyanamic Views.XML for draw.io diagram 
customObject(v1.0.0.0).ipack is the PIE package containing the custom object used for following queries and mutations. 

## Queries 

### Querying custom object 

```query {
  Object(name: "foo") {
    Id,
    show,
    rating, 
    DateCreated,
    DateModified,
    Deleted
  }
}
```
### Querying My Tasks 

```query {
  Task(name: "bar") {
    Id,
    RespEmployeeName,
    DueDateType,
    LocationId,
    LocationName,
    NetObjectId,
    NetObjectType,
    NetTaskId,
    NextDate,
    RecordDescription,
    Stage,
    TaskType,
    LegacyRecordId,
    LegacyRecordIdName,
    LegacyRespEmployeeId,
    LegacyTaskId,
    WebLink,
  }
}
```

## Mutations

### Create custom object data 

```
mutation {
  createCustomObject(
  	show: "Friends"
    rating: 9
  ){
    Id
  }
}
```

### Update custom object data 

```
mutation {
  updateCustomObject(
	Id: "2342ece5-cbd4-480e-af7e-4a79ecb70a20"
  	show: "Dexter rocks"
    rating: 5
  ){
    Id
  }
```

# Testing Frameworks
File index.test.js contains integration testing example in JEST. 
File test.robot contains integration testing example in Robot Framework. 

# Performance
Comparison of latencies direct call vs throught GraphQL
![OData](https://github.com/mImranAziz/dynamicgraphql/blob/master/performance/odata.png)
![GraphQL](https://github.com/mImranAziz/dynamicgraphql/blob/master/performance/graph.png)