# AskYourDocs

AskYourDocs is a Retrieval-Augmented Generation (RAG) based chatbot that enables users to interact with PDF documents using natural language. The system combines semantic search with local large language models to generate accurate, context-aware answers grounded in document content while maintaining data privacy.

---

## Overview

This project implements an end-to-end RAG pipeline for document question answering. PDF documents are processed, segmented into meaningful text chunks, converted into vector embeddings, and stored in a vector database. When a user asks a question, relevant document context is retrieved using semantic similarity and passed to a local LLM to generate a grounded response.

---

## Key Features

- Natural language question answering over PDF documents  
- Semantic search using vector embeddings  
- Context-aware response generation via a RAG pipeline  
- Local LLM inference for improved privacy and control  
- Modular architecture suitable for extension and scaling  

---

## Tech Stack

- Python  
- LangChain for LLM orchestration  
- ChromaDB for vector storage and retrieval  
- Ollama for running local large language models  
- PDF loaders and text chunking utilities  

---

## System Architecture

1. PDF documents are ingested and split into chunks  
2. Each chunk is converted into an embedding vector  
3. Vectors are stored and indexed using ChromaDB  
4. User queries are embedded and matched semantically  
5. Relevant document context is retrieved  
6. A local LLM generates a response using the retrieved context  
<p align="center">
  <img src="https://github.com/user-attachments/assets/9498fa38-d58f-40db-954e-488fd030d030" width="400" />
</p>


---

## Usage

Users can add PDF documents to the designated input location and run the application. After ingestion, documents become queryable through natural language prompts. The system retrieves relevant sections from the documents and generates responses strictly based on the retrieved content.

---

## Example Use Cases

- Academic paper and textbook analysis  
- Research assistance and literature review  
- Technical documentation and API reference search  
- Legal or policy document question answering  
- Private, offline document intelligence systems  

---

## Future Enhancements

- Web-based user interface  
- Support for additional document formats  
- Conversational memory across queries  
- Metadata-based filtering and advanced search  
- Multi-user and session-based support  

---

## Project Type

Academic / Personal Project  
Built to demonstrate practical understanding of Retrieval-Augmented Generation (RAG), vector databases, and LLM-based application development.

---

## Author

Ishika Singha  
B.Tech CSE (AI & ML)

---

## Acknowledgements

LangChain  
ChromaDB  
Ollama  
Open-source LLM community
