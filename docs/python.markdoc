# VectorDB Client Integration Guide

Welcome to the VectorDB client integration guide. This document outlines how to interact with the VectorDB service using the provided client stubs.

## Python Setup

Before you begin, ensure you have the VectorDB client libraries installed and the gRPC service running on `localhost:50051`.

## Initializing the Client

To start using the VectorDB service, initialize the client stub as follows:

```python
import vectordb_pb2_grpc

channel = grpc.insecure_channel('localhost:50051')
stub = vectordb_pb2_grpc.VectorDBStub(channel)
```

## Writing Data

To write data to the VectorDB service, create a `VectorWriteRequest` with the key and vector data:

```python
import vectordb_pb2

write_data = vectordb_pb2.VectorWriteRequest(key="vector_key_123", vector=[0.5, 1.2, 3.4])
write_response = stub.Write(write_data)
print("Write response:", write_response)
```

## Reading Data

To read data from the VectorDB service, use the `VectorReadRequest` with the desired key:

```python
read_data = vectordb_pb2.VectorReadRequest(key="vector_key_123")
read_response = stub.Read(read_data)
print("Read response:", read_response)
```

## Updating Data

If you need to update existing data, create a `VectorUpdateRequest` with the updated vector:

```python
update_data = vectordb_pb2.VectorUpdateRequest(key="vector_key_123", vector=[2.3, 4.5, 6.7])
update_response = stub.Update(update_data)
print("Update response:", update_response)
```

## Deleting Data

To delete data, use the `VectorDeleteRequest` with the key of the vector you want to remove:

```python
delete_data = vectordb_pb2.VectorDeleteRequest(key="vector_key_123")
delete_response = stub.Delete(delete_data)
print("Delete response:", delete_response)
```

## Batch Writing Data

For batch operations, you can send multiple write requests together using `VectorBatchWriteRequest`:

```python
batch_write_data = vectordb_pb2.VectorBatchWriteRequest(vectors=[
    vectordb_pb2.VectorWriteRequest(key="vector_key_456", vector=[4.5, 5.6, 6.7]),
    vectordb_pb2.VectorWriteRequest(key="vector_key_789", vector=[7.8, 8.9, 9.0])
])
batch_write_response = stub.BatchWrite(batch_write_data)
print("Batch Write response:", batch_write_response)
```

## Conclusion

By following these examples, you can perform basic operations against the VectorDB service. Ensure to handle responses and exceptions as per your application's requirements.
